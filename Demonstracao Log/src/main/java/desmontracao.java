import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.List;

public class desmontracao {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        LocalDateTime momento = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        List cadastros_empresas = new ArrayList<>();
        List<String> perguntas= List.of("Nome fantasia:", "CNPJ:", "E-mail da empresa:", "Telefone:", "CEP", "Logradouro", "Senha desejada:");

        System.out.println(momento.format(formatter)+" - Inicie Seu Cadastro!");
        System.out.println(momento.format(formatter)+" - Informe as seguintes informações da empresa");

        List McDonalds = new ArrayList<>();
        // Dados para McDonald's
        McDonalds.addAll(List.of("CD:2", "McDonalds", "12.345.678/0001-90", "contato@mcdonalds.com.br", "(11) 4002-8922", "01000-000", "Avenida Paulista 1234 - São Paulo", "senhaSegura123"));
        cadastros_empresas.add(McDonalds);
        List Burguer_King = new ArrayList<>();
        // Dados para Burger King
        Burguer_King.add("CD:3");
        Burguer_King.add("Burger King");
        Burguer_King.add("98.765.432/0001-09");
        Burguer_King.add("contato@burgerking.com.br");
        Burguer_King.add("(11) 3003-2828");
        Burguer_King.add("02000-000");
        Burguer_King.add("Rua dos Burgers, 567, São Paulo");
        Burguer_King.add("senhaSuperSegura");

        cadastros_empresas.add(Burguer_King);
        Integer código_empresa=3;
        Integer i = 0;
        List nova_empresa = new ArrayList<>();

        for (; i < perguntas.size() ; i++) {
            momento = LocalDateTime.now();
            System.out.println((momento.format(formatter)+" - "+perguntas.get(i)));
            nova_empresa.add(leitor.nextLine());
            if (i == 6) {
                código_empresa +=1;
            }
        }
        if (nova_empresa != null && !nova_empresa.isEmpty()) {
            nova_empresa.addFirst("CD:"+código_empresa);
            System.out.println(String.format("%s - Cadastrado com sucesso!\n", momento.format(formatter)));
        }
        cadastros_empresas.add(nova_empresa);
        System.out.println(momento.format(formatter)+" - Lista de Cadastros das Empresas:");
        for (Integer num_lista_emp = 0; num_lista_emp < cadastros_empresas.size() ; num_lista_emp++) {
            momento = LocalDateTime.now();
            System.out.println( momento.format(formatter)+" - "+cadastros_empresas.get(num_lista_emp));
        }
    }
}
