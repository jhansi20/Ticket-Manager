UPDATE users SET data=$1, modified_on=$2 WHERE data->>'userid'=$3;