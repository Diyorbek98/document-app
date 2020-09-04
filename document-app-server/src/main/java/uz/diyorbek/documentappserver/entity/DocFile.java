package uz.diyorbek.documentappserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "doc_file")
public class DocFile {

    @Id
    private String regId;

    private Timestamp regDate;

    private String sourceDocId;

    private Timestamp sourceDocDate;

    @OneToOne(fetch = FetchType.LAZY)
    private Delivery deliveryForm;

    @OneToOne(fetch = FetchType.LAZY)
    private Correspondent correspondent;

    private String topic;
    private String description;

    private Timestamp periodOfExecution;

    private boolean access;
    private boolean control;

    @OneToOne(fetch = FetchType.LAZY)
    private DBFile dbFile;
}
