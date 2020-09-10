package uz.diyorbek.documentappserver.exception;

public class AddDocumentException extends RuntimeException{
    public AddDocumentException(String message) {
        super(message);
    }

    public AddDocumentException(String message, Throwable cause) {
        super(message, cause);
    }
}
