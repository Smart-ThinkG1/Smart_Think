import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# Definir a URL do Reclame Aqui da página da marca específica
base_url = 'https://www.reclameaqui.com.br'
url = 'https://www.reclameaqui.com.br/empresa/mcdonalds/lista-reclamacoes/?pagina=1'

# Fazer uma requisição HTTP para obter o conteúdo da página
response = requests.get(url)

# Verificar se a requisição foi bem-sucedida
if response.status_code == 200:
    # Parsear o conteúdo HTML com BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Coletar os títulos dos comentários e os links associados
    titles = soup.find_all('h4', class_='sc-1pe7b5t-1 bVKmkO')
    links = [base_url + title.find_parent('a')['href'] for title in titles]

    data = []

    # Iterar pelos links para acessar os comentários completos
    for title, link in zip(titles, links):
        # Fazer requisição à página de cada comentário
        comment_response = requests.get(link)

        if comment_response.status_code == 200:
            # Parsear a página do comentário
            comment_soup = BeautifulSoup(comment_response.content, 'html.parser')

            # Encontrar o comentário completo
            full_comment = comment_soup.find('p', class_='sc-lzlu7c-17 fRVYjv').get_text()

            # Armazenar o título e o comentário completo
            data.append({
                'Title': title.get_text(),
                'Comment': full_comment
            })

        # Atraso entre as requisições para não sobrecarregar o servidor
        time.sleep(1)

    # Exibir os dados extraídos
    for item in data:
        print(f"Título: {item['Title']}\nComentário Completo: {item['Comment']}\n")

    # Salvar os dados em CSV
    df = pd.DataFrame(data)
    df.to_csv('comments_with_full_text.csv', index=False)

else:
    print("Erro ao acessar o site")