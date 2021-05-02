/*  THIS CODE WAS TAKEN FROM QVAULT.IO
    WHERE THE AUTHOR IS LANE WAGNER.
    MORE DETAILS CAN BE FOUND IN 
    https://qvault.io/javascript/how-to-cache-images-react-native-expo-managed/ */

import React, { Component } from 'react';
import { View, ImageBackground, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import styles from './CachedImageStyleSheet';

export default class CachedImage extends Component {
  state = {
    imgURI: '',
    loading: true
  }

  async componentDidMount() {
    const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
    await this.loadImage(filesystemURI, this.props.source.uri);
    this.setState({
        ...this.state,
        loading: false
    })
  }

  async componentDidUpdate() {
    const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
    if (this.props.source.uri === this.state.imgURI ||
      filesystemURI === this.state.imgURI) {
      return null;
    }
    await this.loadImage(filesystemURI, this.props.source.uri);
    this.setState({
        ...this.state,
        loading: false
    })
  }

  async getImageFilesystemKey(remoteURI) {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteURI
    );
    return `${FileSystem.cacheDirectory}${hashed}`;
  }

  async loadImage(filesystemURI, remoteURI) {
    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        this.setState({
          ...this.state,
          imgURI: filesystemURI
        });
        return;
      }

      // otherwise download to cache
      const imageObject = await FileSystem.downloadAsync(
        remoteURI,
        filesystemURI
      );
      this.setState({
        ...this.state,
        imgURI: imageObject.uri
      });
    }
    catch (err) {
      console.log('Image loading error:', err);
      this.setState({ ...this.state, imgURI: remoteURI });
    }
  }

  render() {
    return (
      <View style={styles.imageContainer}>
          <ImageBackground
            {...this.props}
            source={this.state.imgURI ? { uri: this.state.imgURI } : null}
            style={[styles.image, this.props.imageStyle ? {...this.props.imageStyle} : {}]}
          >
            {this.state.loading 
                && 
                    <ActivityIndicator
                        size="large"
                        color="#8C0634"
                    />
            }
          </ImageBackground>
      </View>
    );
  }
}