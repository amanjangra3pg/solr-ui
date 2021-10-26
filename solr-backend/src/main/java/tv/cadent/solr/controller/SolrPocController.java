package tv.cadent.solr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tv.cadent.solr.dao.SolrDao;
import tv.cadent.solr.model.SearchQuery;

@RestController
public class SolrPocController {
	@Autowired
	SolrDao dao;

	@PostMapping("/upload")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			dao.upload(dao.getDocsFromCSV(file));
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@PostMapping("/search")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> search(@RequestBody SearchQuery searchQuery) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(dao.search(searchQuery));
		} catch (Exception e) {
			String message = "Error Occured !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@GetMapping("/products/{id}")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> getProduct(@PathVariable String id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(dao.getOne(id));
		} catch (Exception e) {
			String message = "Error Occured !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@PutMapping("/product")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> updateProduct(@RequestBody Map<String,Object> documentFields) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(dao.update(documentFields));
		} catch (Exception e) {
			String message = "Error Occured !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@DeleteMapping("/product/{id}")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> deleteProduct(@PathVariable String id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(dao.deleteByID(id));
		} catch (Exception e) {
			String message = "Error Occured !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

}
