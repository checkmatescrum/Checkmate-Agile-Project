package universite_ogrenci_kulubu;
import javax.swing.*;
import java.awt.*;
import java.sql.*;

/**
 * Basit Swing + JDBC örneği.
 * MySQL'den tek bir message çekip bir mesaj kutusunda gösterir.
 *
 * Çalıştırmadan önce DB bilgilerini kendi ortamına göre güncelle:
 *   DB_URL, DB_USER, DB_PASS
 */
public class Main {
    // --- MySQL bağlantı bilgilerini buraya yaz ---
    // Eğer veritabanı adını farklı oluşturduysan (ör. "Universite Ogrenci Kulubu") burada o ismi yaz.
    private static final String DB_NAME = "Universite Ogrenci Kulubu";
    private static final String DB_URL  = "jdbc:mysql://localhost:3306/universite_ogrenci_kulubu?useSSL=false&serverTimezone=UTC" + DB_NAME + "?useSSL=false&serverTimezone=UTC";
    private static final String DB_USER = "root";        // veya "root"
    private static final String DB_PASS = "Duhecoka4";   // kendi şifren

    // Sorgu: ilk mesajı alacak şekilde LIMIT 1
    private static final String SELECT_SQL = "SELECT message FROM systemmessages ORDER BY code LIMIT 1";

    public static void main(String[] args) {
        // Swing UI'ını Event Dispatch Thread üzerinde oluştur
        SwingUtilities.invokeLater(() -> createAndShowGUI());
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Mesaj Gösterici");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(450, 200);
        frame.setLocationRelativeTo(null);

        // Basit bir text alan (okunabilir, çok satırlı)
        JTextArea messageArea = new JTextArea();
        messageArea.setEditable(false);
        messageArea.setLineWrap(true);
        messageArea.setWrapStyleWord(true);
        messageArea.setFont(new Font("SansSerif", Font.PLAIN, 14));
        messageArea.setText("Veritabanından mesaj yükleniyor...");

        JScrollPane scroll = new JScrollPane(messageArea);
        scroll.setBorder(BorderFactory.createTitledBorder("Sistem Mesajı"));

        JButton reloadBtn = new JButton("Yeniden Yükle");
        reloadBtn.addActionListener(e -> loadMessageAsync(messageArea));

        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        bottom.add(reloadBtn);

        frame.getContentPane().add(scroll, BorderLayout.CENTER);
        frame.getContentPane().add(bottom, BorderLayout.SOUTH);

        frame.setVisible(true);

        // Uygulama açılır açılmaz veri çek
        loadMessageAsync(messageArea);
    }

    // Arka planda DB'ye bağlanıp mesajı çeken metod (UI donmaz)
    private static void loadMessageAsync(JTextArea messageArea) {
        messageArea.setText("Yükleniyor...");
        SwingWorker<String, Void> worker = new SwingWorker<String, Void>() {
            @Override
            protected String doInBackground() throws Exception {
                // Eğer Driver sınıfını elle yüklemek istersen uncomment:
                // Class.forName("com.mysql.cj.jdbc.Driver");

                try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
                     PreparedStatement ps = conn.prepareStatement(SELECT_SQL);
                     ResultSet rs = ps.executeQuery()) {

                    if (rs.next()) {
                        return rs.getString("message");
                    } else {
                        return "Veritabanında gösterilecek mesaj bulunamadı.";
                    }
                }
            }

            @Override
            protected void done() {
                try {
                    String message = get();
                    messageArea.setText(message);
                } catch (Exception ex) {
                    // Hata durumunda kullanıcıya anlaşılır mesaj göster
                    messageArea.setText("Mesaj yüklenirken hata oluştu:\n" + ex.getMessage());
                    ex.printStackTrace();
                    // İstersen daha bilgilendirici bir dialog da göster
                    JOptionPane.showMessageDialog(null,
                            "Veri yüklenirken hata oluştu:\n" + ex.getMessage(),
                            "Hata", JOptionPane.ERROR_MESSAGE);
                }
            }
        };

        worker.execute();
    }
}
