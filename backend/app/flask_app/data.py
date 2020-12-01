#%%

import pandas as pd
import json, pathlib, datetime
from sqlalchemy import create_engine

currentdir = str(pathlib.Path().absolute())
db_location = "sqlite:///" + str(currentdir) + "/database.db"

data = pd.read_csv('data.csv')
data = data.drop(columns=['sun_brightness'], axis=1)


def stringtofloat(data):
    data = data.replace(',','.')
    data = float(data)
    return data

data["CO2"] = data["CO2"].apply(stringtofloat)
data['inside_temperature'] = data['inside_temperature'].apply(stringtofloat)
data['outside_temperature'] = data['outside_temperature'].apply(stringtofloat)
data['solar_panel_generation'] = data['solar_panel_generation'].apply(stringtofloat)
data['power_usage'] = data['power_usage'].apply(stringtofloat)
#data['datetime'] = data['date'] + ' ' + data['time']
data['datetime'] = pd.to_datetime(data['date'] + ' ' + data['time'])
data = data.drop(columns=['time'], axis=1)
data = data.drop(columns=['date'], axis=1)

print(data.info(verbose=True))
print(data.head(n=3))
engine = create_engine(db_location)
data.to_sql('analytics_dashboard', con=engine, if_exists='replace', index=True, index_label="index")
with open('results.json', 'w', encoding='utf-8') as file:
        data.to_json(file,orient="records", force_ascii=False)

# %%
