import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const imagesHandlers = {
	addImageAndRetrive: async (image: File) => {
		try {
			const fileRef = ref(storage, `images/${image.name}`);
			await uploadBytes(fileRef, image);
			console.log('uploaded');

			const url = await getDownloadURL(fileRef);
			return url;
		} catch (e) {
			console.log('Error :', e);
		}
	}
};
