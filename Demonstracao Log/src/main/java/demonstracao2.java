import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class demonstracao2 {

    // Lista de filiais movida para fora do método
    static List<List<String>> cadastrosFiliais = new ArrayList<>();

    public static void main(String[] args) {

    }

    public static void unidades() {
        Scanner leitor = new Scanner(System.in);
        LocalDateTime momento = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        List<String> perguntas = List.of("Nome fantasia:", "CNPJ:", "E-mail da empresa:", "Telefone:", "CEP:", "Logradouro:", "Senha desejada:");

        int codigoFilial = cadastrosFiliais.size() + 3;  // Gera um código baseado no número de filiais cadastradas

        List<String> novaFilial = new ArrayList<>();

        for (String pergunta : perguntas) {
            System.out.println(pergunta);
            novaFilial.add(leitor.nextLine());
        }

        // Adiciona a data e código da filial
        novaFilial.add(momento.format(formatter)); // Adiciona a data e hora
        novaFilial.add(0, "FL:" + codigoFilial); // Adiciona o código da filial no início

        cadastrosFiliais.add(novaFilial);  // Adiciona a nova filial à lista global

        System.out.println(String.format("Cadastrado com sucesso! - %s", momento.format(formatter)));
    }
}
