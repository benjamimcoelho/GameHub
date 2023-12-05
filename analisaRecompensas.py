import datetime
import mysql.connector
from mysql.connector import connection

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = 'Pedro1234'
DB_NAME = 'gamehub'


connection = mysql.connector.connect(
    host= DB_HOST,
    user= DB_USER,
    password= DB_PASS,
    database= DB_NAME
)

cursor = connection.cursor()


import time

def get_tags_terminadas() -> list:
    query = "SELECT id, recompensa_id from tag WHERE fim_torneio < now();"
    
    try:
        cursor.execute(query)
    except:
        return False
    
    res = []

    for r in cursor:
        res.append( (r[0], r[1]) )

    return res

def get_post_media_vencedor(id_tag : int) -> int:
    query = """
        SELECT gamer_id FROM post_multimedia as p
            JOIN post_multimedia_tags as ps on p.id = ps.post_multimedia_id
            WHERE tags_id = %s
            ORDER BY likes DESC
            limit 1;
    """ % str(id_tag)
    
    cursor.execute(query)
    
    id = -1

    if (x:=cursor.fetchone()) is not None:
        id = x[0]
    
    return id

def insert_recompensa_gamer(idGamer : int, idRecompensa : int):
    query = """
        insert into recompensas 
            (gamer, recompensa) 
                values (%s, %s);
    """ % str(idGamer), str(idRecompensa)

    try:
        cursor.execute(query)
        connection.commit()
    except:
        print("ERRO:\n" + query)

def apagarTags(idTag : int):
    query1 = """
        DELETE FROM post_multimedia_tags WHERE tags_id = %s;
    """ % str(idTag)

    query2 = """
        DELETE FROM tag WHERE id = %s;
    """ % str(idTag)

    try:
        cursor.execute(query1)
        cursor.execute(query2)
        connection.commit()
    except:
        print("ERRO: Impossivel apagar as Tags")

def executa_processo():
    list_tags_terminadas = get_tags_terminadas()

    for tag_id, id_recompensa in list_tags_terminadas:
        id_vencedor = get_post_media_vencedor(tag_id)
        insert_recompensa_gamer(id_vencedor, id_recompensa)
        apagarTags(tag_id)


def main():
    data_atual = datetime.datetime.now()
    data_para_acordar = datetime.datetime(data_atual.year, data_atual.month, data_atual.day+1, 1)

    falta = data_para_acordar - data_atual

    time.sleep(falta.seconds)
    
    while True:
        executa_processo()
        time.sleep(60*60*24) # dormir por 24 horas


if __name__ == "__main__":
    main()
