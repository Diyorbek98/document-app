package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.diyorbek.documentappserver.entity.Correspondent;

@RepositoryRestResource(path = "correspondent")
public interface CorrespondentRepository extends JpaRepository<Correspondent, Integer> {
}
