import RNGeolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { PermissionsAndroid, PermissionStatus, Platform } from 'react-native';
import { TFunction } from 'i18next';

export class Geolocation {
  public static async get(t: TFunction): Promise<GeolocationResponse> {
    let granted: PermissionStatus = 'granted';
    if (Platform.OS === 'android') {
      granted = await this.authorizeAndroid(t);
    }
    if (granted !== 'granted') {
      throw new Error('GEOLOCATION_PERMISSION_DENIED');
    }

    return this.getLocation();
  }

  private static getLocation(): Promise<GeolocationResponse> {
    return new Promise((resolve, reject) => {
      RNGeolocation.getCurrentPosition(
        (info) => resolve(info),
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            return reject('GEOLOCATION_PERMISSION_DENIED');
          }
          if (error.code === error.POSITION_UNAVAILABLE) {
            return reject('GEOLOCATION_POSITION_UNAVAILABLE');
          }
          if (error.code === error.TIMEOUT) {
            return reject('GEOLOCATION_TIMEOUT');
          }
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    });
  }

  private static authorizeAndroid(t: TFunction): Promise<PermissionStatus> {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Komak',
        message: t('GEOLOCATION_DESCRIPTION'),
        buttonNeutral: t('ACTIONS_LATER'),
        buttonNegative: t('ACTIONS_CANCEL'),
        buttonPositive: t('ACTIONS_OK'),
      }
    );
  }
}
