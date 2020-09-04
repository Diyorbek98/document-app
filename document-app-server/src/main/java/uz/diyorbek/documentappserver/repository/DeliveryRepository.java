package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.diyorbek.documentappserver.entity.Delivery;

@RepositoryRestResource(path = "delivery")
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
}
