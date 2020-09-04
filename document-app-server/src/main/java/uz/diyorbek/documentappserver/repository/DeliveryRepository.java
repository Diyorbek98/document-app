package uz.diyorbek.documentappserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.diyorbek.documentappserver.entity.Delivery;
import uz.diyorbek.documentappserver.projection.CustomDelivery;

@RepositoryRestResource(path = "delivery", excerptProjection = CustomDelivery.class)
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
}
