package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.diyorbek.documentappserver.entity.DocFile;

public interface DocFileRepository extends JpaRepository<DocFile, String> {
}
