package uz.diyorbek.documentappserver.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.diyorbek.documentappserver.entity.Delivery;

@Projection(name = "customDelivery",types = {Delivery.class})
public interface CustomDelivery {
    Integer getId();
    String getName();
}
