package uz.diyorbek.documentappserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.diyorbek.documentappserver.entity.DocFile;
import uz.diyorbek.documentappserver.payload.ReqDocFile;
import uz.diyorbek.documentappserver.service.DocFileService;

@RestController
@RequestMapping("/api")
public class DocFileController {
    @Autowired
    private DocFileService docFileService;

    @PostMapping("/addDocument")
    public ResponseEntity addDocFile(@RequestBody ReqDocFile reqDocFile) {
        DocFile docFile = docFileService.addDocFile(reqDocFile);
        return ResponseEntity.ok(docFile);
    }
}
