#! /bin/bash

#echo "instalar dependencias"
#apt install zip -y 
#apt install ansible

NomeUsuario="pedroveloso"

IP_NGINX="34.116.167.251"
IP_APP1="34.91.130.31"
IP_APP2="34.88.101.103"
IP_BD="34.159.109.120"
IP_FRONT="34.65.57.206"
IP_ATRREC="34.159.109.120"

echo "Criar usuário comum"
cd create_user
rm hosts.inv

echo "[users]" >> hosts.inv
echo "$IP_NGINX" >> hosts.inv
echo "$IP_APP1" >> hosts.inv
echo "$IP_APP2" >> hosts.inv
echo "$IP_BD" >> hosts.inv
echo "$IP_FRONT" >> hosts.inv
echo "" >> hosts.inv
printf "[users:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'" >> hosts.inv

ansible-playbook -i "hosts.inv" -u "$NomeUsuario" playbook.yml

echo "Zip frontend components"
zip -r ../deployment-components/roles/front/gamehub-frontend.zip ../../gamehub-frontend

echo "Zip backend components"
zip -r ../deployment-components/roles/app/Implemetacao.zip  ../../Implemetacao

echo "Escrever ficheiros host.inv"
cd ../deployment-components
rm hosts.inv

echo "[dbmaster]" >> hosts.inv
echo "$IP_BD" >> hosts.inv
echo "" >> hosts.inv

echo "[app1]" >> hosts.inv
echo "$IP_APP1" >> hosts.inv
echo "" >> hosts.inv

echo "[app2]" >> hosts.inv
echo "$IP_APP2" >> hosts.inv
echo "" >> hosts.inv

echo "[proxy]" >> hosts.inv
echo "$IP_NGINX" >> hosts.inv
echo "" >> hosts.inv

echo "[front]" >> hosts.inv
echo "$IP_FRONT" >> hosts.inv
echo "" >> hosts.inv

echo "[atrRec]" >> hosts.inv
echo "$IP_BD" >> hosts.inv
echo "" >> hosts.inv

printf "[proxy:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv
printf "[dbmaster:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv
printf "[app1:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv
printf "[app2:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv
printf "[front:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\n\n" >> hosts.inv
printf "[atrRec:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'" >> hosts.inv

rm group_vars/all.yml

printf "ip_proxy: \""$IP_NGINX"\"\n\n" >> group_vars/all.yml

printf "ip_database: \""$IP_BD"\"\n\n" >> group_vars/all.yml

printf "ip_app:\n  - \""$IP_APP1"\"\n  - \""$IP_APP2"\"" >> group_vars/all.yml

echo "Deployment Components"
ansible-playbook -i "hosts.inv" -u "vagrant" playbook.yml -e "ansible_become_pass=123456"

rm roles/front/gamehub-frontend.zip
rm roles/app/Implemetacao.zip

echo "Fim !!"
cd ../..