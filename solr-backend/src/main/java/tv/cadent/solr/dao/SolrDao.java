package tv.cadent.solr.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import javax.annotation.PostConstruct;

import org.apache.commons.math3.stat.descriptive.summary.Product;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.ZkClientClusterStateProvider;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import tv.cadent.solr.model.SearchQuery;

@Service
public class SolrDao {
	@Autowired
	CloudSolrClient solrClient;
	@Value("${zkHost}")
	private String zkHost;

	@PostConstruct
	public void createCollection() throws IOException, SolrServerException {
		solrClient.setDefaultCollection("products");
		ZkClientClusterStateProvider zkClientClusterStateProvider = new ZkClientClusterStateProvider(zkHost);
		if (zkClientClusterStateProvider.getClusterState().getCollectionOrNull("products") == null) {
			zkClientClusterStateProvider.uploadConfig(Paths.get("/setup/productconfigset/conf"), "products");
			CollectionAdminRequest.Create creator = CollectionAdminRequest.createCollection("products", "products", 1,
					2);
			creator.process(solrClient);
		}
		zkClientClusterStateProvider.close();
	}

	public void upload(List<SolrInputDocument> docs) {
		try {
			final UpdateResponse updateResponse = solrClient.add("products", docs, 1000);
			System.out.println(updateResponse);
		} catch (SolrServerException | IOException e) {
			e.printStackTrace();
		}
	}

	public List<SolrInputDocument> getDocsFromCSV(MultipartFile multipartFile) throws IOException {
		boolean isHeader = true;
		List<SolrInputDocument> docs = new ArrayList<>();
		String[] headers = null;
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(multipartFile.getInputStream()))) {
			while (reader.ready()) {
				String line = reader.readLine();
				if (isHeader) {
					headers = line.split(",");
					isHeader = false;
					continue;
				}
				String[] row = line.split(",");
				SolrInputDocument document = new SolrInputDocument();
				for (int i = 0; i < Math.min(headers.length, row.length); i++) {
					document.addField(headers[i], row[i]);
				}
				docs.add(document);
			}
		}
		return docs;
	}

	public SolrDocumentList search(SearchQuery searchQuery) {
		SolrQuery query = new SolrQuery();
		query.set("defType", "edismax");
		query.set("q", "*" + searchQuery.getSearchText() + "*");
		query.set("qf", "name^10 description^5");
		if (searchQuery.getSortMap() != null && !searchQuery.getSortMap().isEmpty()) {
			StringJoiner sortQuery = new StringJoiner(",");
			for (Map.Entry<String, String> sort : searchQuery.getSortMap().entrySet()) {
				sortQuery.add(sort.getKey() + " " + sort.getValue());
			}
			query.set("sort", sortQuery.toString());
		}
		if (searchQuery.getFilterMap() != null && !searchQuery.getFilterMap().isEmpty()) {
			for (Map.Entry<String, String[]> filter : searchQuery.getFilterMap().entrySet()) {
				query.set("fq", filter.getKey() + ":[" + filter.getValue()[0] + " TO " + filter.getValue()[1] + "]");
			}
		}
		QueryResponse response;
		try {
			response = solrClient.query(query);
			SolrDocumentList docList = response.getResults();
			return docList;
		} catch (SolrServerException | IOException e) {
			e.printStackTrace();
			return new SolrDocumentList();
		}
	}
	
	public SolrDocument getOne(Long id) throws Exception{
		SolrQuery query = new SolrQuery();
		query.set("defType", "edismax");
		query.set("q", "*" + id + "*");
		query.set("qf", "id^10");
		
		QueryResponse response;
		response = solrClient.query(query);
		SolrDocumentList docList = response.getResults();
		return docList.get(0);
	}

}
