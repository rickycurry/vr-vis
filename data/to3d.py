from sklearn import decomposition, cluster
from pandas import read_csv, DataFrame, Series

# TODO: break this into a "to3d.py" and a "cluster.py"

# assumes the labels are in the rightmost column
dataframe = read_csv("./data/iris.csv", delimiter=',')
labels = dataframe.iloc[:, -1]
labels.name = "labels"
dataframe.drop(columns = dataframe.columns[-1:], axis=1, inplace=True)

pca = decomposition.PCA(n_components=3)
transformed_data = pca.fit_transform(dataframe)

new_data = DataFrame(transformed_data)
new_data = new_data.join(labels)

# Run clustering algorithms on the transformed data
# K-Means
predictions = cluster.KMeans(n_clusters=3).fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='kmeans'))
# Affinity propagation
predictions = cluster.AffinityPropagation().fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='afprop'))
# Mean shift
predictions = cluster.MeanShift().fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='meanshift'))
# Spectral
predictions = cluster.SpectralClustering(n_clusters=3).fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='spectral'))
# Hierarchical
predictions = cluster.AgglomerativeClustering(n_clusters=3).fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='hierarchical'))
# DBSCAN
predictions = cluster.DBSCAN().fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='dbscan'))
# OPTICS
predictions = cluster.OPTICS().fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='optics'))
# BIRCH
predictions = cluster.Birch().fit_predict(transformed_data)
new_data = new_data.join(Series(predictions, name='birch'))

new_data.to_csv("./data/output.csv")