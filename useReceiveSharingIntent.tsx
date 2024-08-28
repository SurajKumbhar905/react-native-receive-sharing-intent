import React, {useEffect, useState} from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

export type ShareFile = {
  filePath?: string;
  text?: string;
  weblink?: string;
  mimeType?: string;
  contentUri?: string;
  fileName?: string;
  extension?: string;
};

export const useGetShare = () => {
  const [share, setShare] = useState<ShareFile[] | undefined>(undefined);
  const [checkboxStates, setCheckboxStates] = useState(null);

  useEffect(() => {
    // To get All Recived Urls
    ReceiveSharingIntent.getReceivedFiles(
      (files: ShareFile[]) => {
        // files returns as JSON Array example
        //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
        console.log('Received Files', files);
        setShare(files);
      },
      // @ts-ignore
      error => {
        console.log('useGetShare eiioi:: ', error);
      },
      'SteigenHealthApp', // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );

    ReceiveSharingIntent.getCheckboxStates(
      (states: any) => {
        ReceiveSharingIntent.clearcheckBox();
        setCheckboxStates(states);
      },
      error => {
        console.log('Error in getCheckboxStates:', error);
      },
    );
  }, []);

  return {share, checkboxStates};
};

// SteigenHealthApp
