from asyncore import read
from sklearn import cluster
from pandas import read_pickle, Series
import numpy

def doCluster():
    transformed_data = numpy.load("./data/3d_unlabeled.npy")
    new_data = read_pickle("./data/3d_labeled")

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
    # predictions = cluster.Birch().fit_predict(transformed_data)
    # new_data = new_data.join(Series(predictions, name='birch'))

    new_data.to_csv("./data/output.csv")

if __name__ == "__main__":
    cluster()
    