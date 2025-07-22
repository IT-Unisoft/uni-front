import { useState, useEffect, useRef } from "react";
import { getLocation, getProfile, updateProfile } from '@/services/authService';
import { toast } from "@/hooks/use-toast";
import { FormData, Region, District } from '../types';
import { convertFileToBase64 } from '../utils/fileUtils';

export const useProfile = () => {
	const [activeTab, setActiveTab] = useState('about');
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [regions, setRegions] = useState<Region[]>([]);
	const [districts, setDistricts] = useState<District[]>([]);
	const [loadingDistricts, setLoadingDistricts] = useState(false);
	const [saving, setSaving] = useState(false);
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState<FormData>({
		email: "",
		phone: "",
		first_name: "",
		last_name: "",
		birth_date: "",
		pinfl: "",
		avatar: "",
		passport: "",
		region_id: "",
		district_id: "",
		account_type: "individual",
		company_name: "",
		company_inn: "",
		role: ""
	});

	useEffect(() => {
		const initializeProfile = async () => {
			try {
				setLoading(true);
				setError(null);

				const [profileResponse, locationData] = await Promise.all([
					getProfile(),
					getLocation()
				]);

				const allRegions: Region[] = locationData;
				if (!Array.isArray(allRegions)) {
					throw new Error('Данные локаций получены в неверном формате.');
				}
				setRegions(allRegions);

				const userProfile = profileResponse?.user;
				if (userProfile) {
					const profile = userProfile.profile || {};
					const userRegionId = profile.region_id ? profile.region_id.toString() : "";
					const userDistrictId = profile.district_id ? profile.district_id.toString() : "";

					setFormData({
						email: userProfile.email || "",
						phone: userProfile.phone || "",
						first_name: profile.first_name || "",
						last_name: profile.last_name || "",
						birth_date: profile.birth_date || "",
						pinfl: profile.pinfl || "",
						avatar: profile.avatar_url || "",
						passport: profile.passport || "",
						region_id: userRegionId,
						district_id: userDistrictId,
						account_type: profile.account_type || "individual",
						company_name: profile.company_name || "",
						company_inn: profile.company_inn || "",
						role: userProfile.role || "guest"
					});

					if (userRegionId) {
						const selectedRegion = allRegions.find(region => region.id.toString() === userRegionId);
						if (selectedRegion && selectedRegion.districts) {
							setDistricts(selectedRegion.districts);
						}
					}
				} else {
					throw new Error('Некорректная структура данных профиля');
				}
			} catch (err: any) {
				setError(err.message || 'Ошибка при загрузке данных профиля');
				console.error('Ошибка инициализации профиля:', err);
			} finally {
				setLoading(false);
			}
		};

		initializeProfile();
	}, []);

	useEffect(() => {
		if (!formData.region_id || !regions.length) {
			setDistricts([]);
			return;
		}
		setLoadingDistricts(true);
		const selectedRegion = regions.find(region => region.id.toString() === formData.region_id);
		setDistricts(selectedRegion?.districts || []);
		setLoadingDistricts(false);
	}, [formData.region_id, regions]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => {
			const newFormData = { ...prev, [name]: value };
			if (name === 'region_id') {
				newFormData.district_id = "";
			}
			return newFormData;
		});
	};

	const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
			toast({
				title: "Ошибка",
				description: "Поддерживаются только файлы PNG и JPG",
				variant: "destructive",
			});
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			toast({
				title: "Ошибка",
				description: "Размер файла не должен превышать 5MB",
				variant: "destructive",
			});
			return;
		}

		setUploadingAvatar(true);

		try {
			const base64String = await convertFileToBase64(file);

			setFormData(prev => ({
				...prev,
				avatar: base64String
			}));

			toast({
				title: "Успешно!",
				description: "Изображение загружено",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "Ошибка",
				description: "Не удалось загрузить изображение",
				variant: "destructive",
			});
		} finally {
			setUploadingAvatar(false);
		}
	};

	const handleRemoveAvatar = () => {
		setFormData(prev => ({
			...prev,
			avatar: ""
		}));

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			await updateProfile({
				...formData,
				region_id: formData.region_id ? parseInt(formData.region_id) : null,
				district_id: formData.district_id ? parseInt(formData.district_id) : null
			});

			toast({
				title: "Успешно!",
				description: "Профиль успешно обновлён",
				variant: "default",
			});

			setIsEditing(false);
		} catch (error) {
			toast({
				title: "Ошибка",
				description: "Не удалось обновить профиль",
				variant: "destructive",
			});
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => setIsEditing(false);
	const handleEdit = () => setIsEditing(true);

	return {
		// State
		activeTab,
		isEditing,
		loading,
		error,
		regions,
		districts,
		loadingDistricts,
		saving,
		uploadingAvatar,
		formData,
		fileInputRef,
		
		// Actions
		setActiveTab,
		handleInputChange,
		handleAvatarFileChange,
		handleRemoveAvatar,
		handleSave,
		handleCancel,
		handleEdit
	};
};

