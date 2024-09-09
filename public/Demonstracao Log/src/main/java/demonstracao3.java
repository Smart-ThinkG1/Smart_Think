import java.util.Scanner;

public class demonstracao3 {
    public static void main(String[] args) {
        desmontracao log_empresa = new desmontracao();
        demonstracao2 log_unidades = new demonstracao2();
        Scanner leitura = new Scanner(System.in);

        Integer numero_unidades = 0;

        System.out.println("Inicie Seu Cadastro e informe as informações a seguir!");
        System.out.println("Quantidade de unidades:");
        numero_unidades = leitura.nextInt();

        for (Integer contagem_unidades = 1; contagem_unidades <= numero_unidades; contagem_unidades++) {
            demonstracao2.unidades();
            }
        System.out.println("Lista das Filiais Cadastradas:\n");
        for (int num_lista_fili = 0; num_lista_fili < demonstracao2.cadastrosFiliais.size() ; num_lista_fili++) {
            System.out.println(demonstracao2.cadastrosFiliais.get(num_lista_fili));
        }

    }
}
