package tv.cadent.solr.dao.config;

import java.util.List;

import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SolrConfiguration {
	@Value("${solr.urls}")
	private List<String> solrUrls;

	@Bean
	public CloudSolrClient cloudSolrClient() {
		CloudSolrClient.Builder builder = new CloudSolrClient.Builder(solrUrls);
		return builder.build();
	}
}
