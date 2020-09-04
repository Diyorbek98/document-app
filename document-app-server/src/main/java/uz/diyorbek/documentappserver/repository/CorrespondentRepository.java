package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.diyorbek.documentappserver.entity.Correspondent;
import uz.diyorbek.documentappserver.projection.CustomCorrespondent;

@RepositoryRestResource(path = "correspondent", excerptProjection = CustomCorrespondent.class)
public interface CorrespondentRepository extends JpaRepository<Correspondent, Integer> {
}
