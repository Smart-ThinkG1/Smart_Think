import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class demonstracao3 {
    public static void main(String[] args) {
        desmontracao log_empresa = new desmontracao();
        demonstracao2 log_unidades = new demonstracao2();
        LocalDateTime momento = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        Scanner leitura = new Scanner(System.in);



        Integer numero_unidades = 0;

        System.out.println(momento.format(formatter)+" - Inicie Seu Cadastro e informe as informações a seguir!");
        System.out.println(momento.format(formatter)+" - Quantidade de unidades:");
        numero_unidades = leitura.nextInt();

        for (Integer contagem_unidades = 1; contagem_unidades <= numero_unidades; contagem_unidades++) {
            demonstracao2.unidades();
            momento = LocalDateTime.now();
        }
        System.out.println(String.format("%s - Lista das unidades Cadastradas:",momento.format(formatter)));
        for (int num_lista_fili = 0; num_lista_fili < demonstracao2.cadastrosFiliais.size() ; num_lista_fili++) {
            momento = LocalDateTime.now();
            System.out.println(momento.format(formatter) +" - "+demonstracao2.cadastrosFiliais.get(num_lista_fili));
        }

    }
}
