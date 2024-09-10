import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class demonstracao2 {


    static List<List<String>> cadastrosFiliais = new ArrayList<>();

    public static void main(String[] args) {

    }

    public static void unidades() {
        Scanner leitor = new Scanner(System.in);
        LocalDateTime momento = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        List<String> perguntas = List.of("Nome fantasia:", "CNPJ:", "E-mail da empresa:", "Telefone:", "CEP:", "Logradouro:", "Senha desejada:");

        Integer codigoFilial = cadastrosFiliais.size() + 3;

        List<String> novaFilial = new ArrayList<>();

        for (String pergunta : perguntas) {
            momento=LocalDateTime.now();
            System.out.println(momento.format(formatter)+" - "+pergunta);
            novaFilial.add(leitor.nextLine());
        }


        novaFilial.add(0, "FL:" + codigoFilial);

        cadastrosFiliais.add(novaFilial);


        System.out.println(String.format("%s - Cadastrado com sucesso!\n", momento.format(formatter)));
    }
}
