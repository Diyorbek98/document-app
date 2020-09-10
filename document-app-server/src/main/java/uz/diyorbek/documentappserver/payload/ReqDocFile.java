package uz.diyorbek.documentappserver.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqDocFile {
    @NotBlank
    @Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
    private String regId;

    @NotBlank
    private Timestamp regDate;

    @Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
    private String sourceDocId;

    private Timestamp sourceDocDate;

    private Integer deliveryId;

    @NotBlank
    private Integer correspondentId;

    @NotBlank
    @Size(max = 100, message = "Name must be long 100 characters")
    private String topic;

    @Size(max = 1000, message = "Name must be long 1000 characters")
    private String description;

    private Timestamp periodOfExecution;

    private Boolean access;
    private Boolean control;
    private String dbFileId;
}
