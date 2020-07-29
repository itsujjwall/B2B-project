import pickle
import sklearn
from sklearn.preprocessing import OrdinalEncoder


class _1704546():

    def __tranformation1(self, data):
        enc = OrdinalEncoder()
        data['name_customer'] = enc.fit_transform(data[['name_customer']])
        return data

    def getPredictions(self, data, model):
        data = self.__tranformation1(data)

        features = ['cust_payment_terms', 'age_invoice',
                    'name_customer', 'invoice_currency']
        print(data[features])

        predictions = model.predict(data[features])
        data['predictions'] = predictions
        pred = data.loc[:, ['actual_open_amount',
                            'predictions', 'pk_id']].to_dict(orient="records")
        return pred
