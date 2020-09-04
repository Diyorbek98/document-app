package uz.diyorbek.documentappserver.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.diyorbek.documentappserver.entity.Correspondent;

@Projection(name = "customCorrespondent",types = {Correspondent.class})
public interface CustomCorrespondent {
    Integer getId();
    String getName();
}
