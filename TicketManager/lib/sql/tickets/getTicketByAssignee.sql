SELECT * from tickets WHERE data->>'assignee'=$1;