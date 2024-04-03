#! C:\Users\SpyrosApostolopoulos\AppData\Local\Programs\Python\Python311\python.exe

import pickle
import numpy as np
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from nltk.stem import WordNetLemmatizer
import nltk
import csv
import re
import sys
# likes = sys.argv[1]
# reply = sys.argv[2]
# retweet = sys.argv[3]
text = sys.argv[4]
for x in range(5, len(sys.argv)):
    text = text + " "+sys.argv[x]

import random


class Sentiment:
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"




with open('test.txt', 'rb') as test:
    test_x = np.load(test)

vectorizer = TfidfVectorizer(
    max_features=1500, min_df=20, max_df=0.3, stop_words=stopwords.words('english'))

vectorizer.fit_transform(test_x).todense()


with open(r'data_needed_form_lampros_thesis\sentiment_classifier_2000000_tweets.pkl', 'rb') as f:
    classification_model = pickle.load(f)

# prepei na alazei to value sto test_set
test_set = [text]
new_test = vectorizer.transform(test_set).toarray()

negative_value=0
positive_value=0
for i in range(0,7):
    if (classification_model[i].predict(new_test)=='NEGATIVE'):
        negative_value += 1
    elif (classification_model[i].predict(new_test)=='POSITIVE'):
        positive_value +=1


if (positive_value>=negative_value):
    print('true')
else:
    print('false')      
