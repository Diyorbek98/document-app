package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.diyorbek.documentappserver.entity.DBFile;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {
}
