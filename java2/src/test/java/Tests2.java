import junit.framework.TestCase;
import org.junit.Test;

public class Tests2 extends TestCase {
    @Test
    public void testFileFolder() throws Exception {
        TestFileFolder testFileFolder = new TestFileFolder();
        testFileFolder.run();
    }
}