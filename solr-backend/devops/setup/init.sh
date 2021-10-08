#!/bin/sh
#/opt/solr/bin/solr zk upconfig -z zoo-1:2181 -n products -d /setup/productconfigset
#sleep 10;
#curl 'http://solr-1:8983/solr/admin/collections?action=CREATE&name=products&numShards=1&replicationFactor=2&maxShardsPerNode=1&collection.configName=products'

_term(){
 kill -TERM $PID
}

RESULT=$(curl -s -o /dev/null -I -w '%{http_code}' http://solr-1:8983/solr/admin/cores?action=STATUS)
while [ "$RESULT" -ne '200' ]; do
  echo "waiting for solr !!!"
  sleep 1
  RESULT=$(curl -s -o /dev/null -I -w '%{http_code}' http://solr-1:8983/solr/admin/cores?action=STATUS)
done

trap _term SIGTERM
java -jar /solr-poc.jar &
PID=$!

wait $PID
