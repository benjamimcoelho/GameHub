#! /bin/bash

#echo "instalar dependencias"
#apt install zip -y 
#apt install ansible

NomeUsuario="pedroveloso"

IP_APP="34.175.214.115"
IP_FRONT="34.175.91.247"
PORT_APP="80"

echo "Criar usuário comum"
cd create_user
rm hosts.inv

echo "[users]" >> hosts.inv
echo "$IP_APP" >> hosts.inv
echo "$IP_FRONT" >> hosts.inv
echo "" >> hosts.inv
printf "[users:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'" >> hosts.inv

ansible-playbook -i "hosts.inv" -u "$NomeUsuario" playbook.yml

echo "Zip frontend components"
zip -r ../deployment-components-unica_maquina/roles/front/gamehub-frontend.zip ../../gamehub-frontend

echo "Zip backend components"
zip -r ../deployment-components-unica_maquina/roles/app/Implemetacao.zip  ../../Implemetacao

echo "Escrever ficheiros host.inv"
cd ../deployment-components-unica_maquina
rm hosts.inv

echo "[app]" >> hosts.inv
echo "$IP_APP" >> hosts.inv
echo "" >> hosts.inv
printf "[app:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv

echo "[front]" >> hosts.inv
echo "$IP_FRONT" >> hosts.inv
echo "" >> hosts.inv
printf "[front:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv

rm group_vars/all.yml
printf "ip_app: \""$IP_APP"\"\n\n" >> group_vars/all.yml
printf "port_app: \""$PORT_APP"\"\n" >> group_vars/all.yml

echo "Deployment Components"
ansible-playbook -i "hosts.inv" -u "vagrant" playbook.yml -e "ansible_become_pass=123456"

rm roles/front/gamehub-frontend.zip
rm roles/app/Implemetacao.zip

echo "Fim !!"
cd ../..