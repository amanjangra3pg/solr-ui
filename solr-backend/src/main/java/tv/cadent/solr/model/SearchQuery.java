package tv.cadent.solr.model;

import java.util.Map;

public class SearchQuery {
	private String searchText;
	private Map<String, String> sortMap;
	private Map<String, String[]> filterMap;

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}

	public Map<String, String> getSortMap() {
		return sortMap;
	}

	public void setSortMap(Map<String, String> sortMap) {
		this.sortMap = sortMap;
	}

	public Map<String, String[]> getFilterMap() {
		return filterMap;
	}

	public void setFilterMap(Map<String, String[]> filterMap) {
		this.filterMap = filterMap;
	}

}
