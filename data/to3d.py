from sklearn import decomposition
from pandas import read_csv, DataFrame #, to_csv

# assumes the labels are in the rightmost column
dataframe = read_csv("./data/iris.csv", delimiter=',')
labels = dataframe.iloc[:, -1]
labels.name = "labels"
dataframe.drop(columns = dataframe.columns[-1:], axis=1, inplace=True)

pca = decomposition.PCA(n_components=3)
transformed_data = pca.fit_transform(dataframe)

new_data = DataFrame(transformed_data)
new_data = new_data.join(labels)

new_data.to_csv("./data/output.csv")