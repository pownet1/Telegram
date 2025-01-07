import os

nginx_config_path = "/etc/nginx/conf.d/"


def reload_nginx_config():
    os.system("nginx -s reload")


def add_domain(domain: str):
    print("ADD DOMAIN")
    path = nginx_config_path + domain + ".conf"
    print(path)
    with open(path, "w") as f:
        new_server = """
    server {
        listen 80;
        listen [::]:80;
        
        server_name example.com;
    
        location / {
            proxy_pass http://127.0.0.1:8443;
            
            proxy_read_timeout 90s;
            proxy_connect_timeout 90s;
            proxy_send_timeout 90s;
            
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
    }
}
"""
        new_server = new_server.replace("example.com", domain)
        f.write(new_server)

    reload_nginx_config()


def delete_domain(domain: str): 
    path = nginx_config_path + domain + ".conf"

    os.remove(path)
    reload_nginx_config()


def get_cert(domain: str):
    _status = True
    os.system(f"certbot certonly --nginx --non-interactive --agree-tos --email admin@{domain} -d  {domain}")

    path = f'/etc/letsencrypt/live/{domain}/'
    filename = 'fullchain.pem'

    if filename not in os.listdir(path):
        delete_domain(domain)

        _status = False

    reload_nginx_config()
    return _status
