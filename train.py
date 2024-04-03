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
# import sys
# likes = sys.argv[1]
# reply = sys.argv[2]
# retweet = sys.argv[3]
# text = sys.argv[4]
# for x in range(5, len(sys.argv)):
#     text = text + " "+sys.argv[x]

import random


class Sentiment:
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"


class Data:
    def __init__(self, tweet, replies, retweets, likes):
        self.tweet = tweet
        self.replies = replies
        self.retweets = retweets
        self.likes = likes
        self.sentiment = self.get_sentiment()

    def get_sentiment(self):
        if self.replies >= '200' or self.retweets >= '300' or self.likes >= '500':
            return Sentiment.POSITIVE
        else:
            return Sentiment.NEGATIVE


class DataContainer:
    def __init__(self, data):
        self.data = data

    def get_text(self):
        return [x.tweet for x in self.data]

    def get_sentiment(self):
        return [x.sentiment for x in self.data]

    def evenly_distribute(self):
        negative = list(filter(lambda x: x.sentiment ==
                        Sentiment.NEGATIVE, self.data))
        positive = list(filter(lambda x: x.sentiment ==
                        Sentiment.POSITIVE, self.data))
        negative_shrunk = negative[:len(positive)]
        self.data = positive + negative_shrunk
        random.shuffle(self.data)


data = []
i = 1
faulty_rows = 0
max_replies = 0
max_retweets = 0
max_likes = 0

with open(r"data_needed_form_lampros_thesis\final_data.csv", encoding='utf-8') as f:
    csvReader = csv.reader(f, delimiter=',', quotechar='"')
    for row in csvReader:
        if (i > 2000000):  # total tweets = 54243060 (faulty rows included)
            break
        if (len(row) == 4):
            if (row[1].isnumeric() and row[2].isnumeric() and row[3].isnumeric()):
                tweet = row[0]
                replies_count = row[1]
                retweets_count = row[2]
                likes_count = row[3]
                data.append(Data(tweet, replies_count,
                            retweets_count, likes_count))
                # Find max replies, retweets, likes
                if (int(replies_count) > max_replies):
                    max_replies = int(replies_count)
                if (int(retweets_count) > max_retweets):
                    max_retweets = int(retweets_count)
                if (int(likes_count) > max_likes):
                    max_likes = int(likes_count)
            else:
                print("Error: row " + str(i) + " was incorrect.")
                faulty_rows = faulty_rows + 1
        else:
            print("Error: row " + str(i) + " was not complete.")
            faulty_rows = faulty_rows + 1
        i = i + 1
f.close()


nltk.download('wordnet')
nltk.download('omw-1.4')

stemmer = WordNetLemmatizer()

for i in range(0, len(data)):
    # Remove all the special characters (punctuation removal)
    document = re.sub(r'[^a-zA-Z0-9]', ' ', str(data[i].tweet))

    # remove all single characters
    document = re.sub(r'\s+[a-zA-Z]\s+', ' ', document)

    # Remove single characters from the start
    document = re.sub(r'\^[a-zA-Z]\s+', ' ', document)

    # Substituting multiple spaces with single space
    document = re.sub(r'\s+', ' ', document, flags=re.I)

    # Removing prefixed 'b'
    document = re.sub(r'^b\s+', '', document)

    # Converting to Lowercase
    document = document.lower()

    # Lemmatization
    document = document.split()

    # Tokenization for stemming
    document = [stemmer.lemmatize(word) for word in document]
    document = ' '.join(document)

    data[i].tweet = document


training, test = train_test_split(data, test_size=0.2, random_state=42)

train_container = DataContainer(training)
test_container = DataContainer(test)

train_container.evenly_distribute()
train_x = train_container.get_text()
train_y = train_container.get_sentiment()

test_container.evenly_distribute()
test_x = test_container.get_text()
test_y = test_container.get_sentiment()


nltk.download('stopwords')

vectorizer = TfidfVectorizer(
    max_features=1500, min_df=20, max_df=0.3, stop_words=stopwords.words('english'))

train_x_vectors = np.asarray(vectorizer.fit_transform(train_x).todense())
test_x_vectors = np.asarray(vectorizer.transform(test_x).todense())

with open('train.txt', 'wb') as f:
    np.save(f,train_x)
with open('test.txt', 'wb') as f:
    np.save(f,test_x)