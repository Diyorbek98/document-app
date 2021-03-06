package uz.diyorbek.documentappserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.diyorbek.documentappserver.entity.DocFile;
import uz.diyorbek.documentappserver.exception.AddDocumentException;
import uz.diyorbek.documentappserver.payload.ReqDocFile;
import uz.diyorbek.documentappserver.repository.CorrespondentRepository;
import uz.diyorbek.documentappserver.repository.DBFileRepository;
import uz.diyorbek.documentappserver.repository.DeliveryRepository;
import uz.diyorbek.documentappserver.repository.DocFileRepository;

@Service
public class DocFileService {
    @Autowired
    private DocFileRepository docFileRepository;

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private CorrespondentRepository correspondentRepository;

    public DocFile addDocFile(ReqDocFile reqDocFile) {
        DocFile docFile = new DocFile();
        try {
            docFile.setRegId(reqDocFile.getRegId());
            docFile.setRegDate(reqDocFile.getRegDate());
            docFile.setSourceDocId(reqDocFile.getSourceDocId());
            docFile.setSourceDocDate(reqDocFile.getSourceDocDate());
            if (reqDocFile.getDeliveryId() != null) {
                docFile.setDeliveryForm(deliveryRepository.findById(reqDocFile.getDeliveryId()).orElseThrow(() -> new ResourceNotFoundException("getDeliveryForm")));
            } else {
                docFile.setDeliveryForm(null);
            }
            docFile.setCorrespondent(correspondentRepository.findById(reqDocFile.getCorrespondentId()).orElseThrow(() -> new ResourceNotFoundException("getCorrespondent")));
            docFile.setTopic(reqDocFile.getTopic());
            docFile.setDescription(reqDocFile.getDescription());
            docFile.setPeriodOfExecution(reqDocFile.getPeriodOfExecution());
            docFile.setAccess(reqDocFile.getAccess());
            docFile.setControl(reqDocFile.getControl());
            if (reqDocFile.getDbFileId() != null) {
                docFile.setDbFile(dbFileRepository.findById(reqDocFile.getDbFileId()).orElseThrow(() -> new ResourceNotFoundException("getDbFile")));
            } else {
                docFile.setDbFile(null);
            }
            return docFileRepository.save(docFile);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new AddDocumentException("Saqlashda Xatolik", ex);
        }
    }
}
