SELECT * from users WHERE data->>'email'=$1;