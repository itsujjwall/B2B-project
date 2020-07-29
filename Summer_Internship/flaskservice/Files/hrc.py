import pandas as pd
import numpy as np
import pandas as pd

dataset = pd.read_csv('C:/Users/KIIT/OneDrive/Desktop/MACHINE LEARNING/HighRadius/AI_ENABLED_FEATURE_ENGINEERING/Moscow_1704546.csv')
print(dataset.head())

#Pre-Processing Stage
from sklearn.preprocessing import OrdinalEncoder
oe = OrdinalEncoder()
dataset['name_customer'] = oe.fit_transform(dataset[['name_customer']])
print(dataset['name_customer'])

print(dataset.columns)
print(dataset.drop(['business_code','acct_doc_header_id','doc_number','invoice_id','invoice_id_norm',
                    'baseline_create_date','shipping_date','invoice_date_norm'],axis=1, inplace=True))

#splitting the data
train,test = dataset[dataset['clear_date'].isnull().apply(lambda x: not x)], dataset[dataset['clear_date'].isnull()]
print(train)
print(test)
#Sorting on the basis of the clear date
train.sort_values('clear_date', inplace=True)
print(train.head())

print(len(train['doc_number_norm'].unique()))
train.drop_duplicates('doc_number_norm', keep='first', inplace=True)
print(train.shape)
print(train.head())

print(train['clear_date'].equals(train['clear_date_norm']), train['document_create_date'].equals(train['document_create_date_norm']))
print(train.drop(['clear_date', 'document_create_date'], axis=1, inplace=True))

#Feature Selection
from sklearn.feature_selection import VarianceThreshold
vts = VarianceThreshold(threshold=0.1)

dates = trao