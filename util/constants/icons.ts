import Icons from "@type/icons";

const icons: Icons = {
	search: "M14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z",
	link: [
		"M9.71299 13.9129C9.39172 14.2131 8.88344 14.2081 8.62553 13.852C7.22832 11.9228 7.39878 9.21062 9.13691 7.47249L12.2386 4.37082C14.1657 2.44369 17.2902 2.44369 19.2173 4.37082C20.9193 6.0728 21.1181 8.7087 19.8139 10.6289C19.58 10.9733 19.0999 10.9918 18.7751 10.7314V10.7314C18.406 10.4355 18.3674 9.88102 18.5988 9.46841C19.3017 8.2153 19.1201 6.59988 18.0542 5.53395C16.7694 4.24919 14.6865 4.24919 13.4017 5.53395L10.3 8.63561C9.22363 9.71202 9.06362 11.3964 9.80965 12.6558C10.0475 13.0573 10.0539 13.5943 9.71299 13.9129V13.9129Z",
		"M11.4081 18.6107C11.1386 18.2414 10.6137 18.1752 10.261 18.4661V18.4661C8.97622 19.7509 6.89322 19.7509 5.60847 18.4661C4.32372 17.1814 4.32372 15.0984 5.60847 13.8136L6.89283 12.5293C7.01287 12.4092 7.0638 12.2365 7.02809 12.0705L6.91722 11.5553C6.83834 11.1887 6.39897 11.0362 6.10992 11.275L4.44535 12.6505C2.51822 14.5776 2.51822 17.7021 4.44535 19.6292C6.37247 21.5564 9.49697 21.5564 11.4241 19.6292V19.6292C11.6661 19.3872 11.6958 19.005 11.4941 18.7286L11.4081 18.6107Z",
		"M14.6862 9.71689C14.0454 9.8143 13.4409 10.0226 12.8932 10.3217C12.3801 9.97021 11.7896 9.78033 11.1929 9.75209C10.9382 9.74003 10.7677 9.46405 10.948 9.28376V9.28376L12.0282 8.20362C12.9434 8.39049 13.8158 8.83889 14.5258 9.54882C14.5808 9.60389 14.6343 9.65993 14.6862 9.71689Z",
		"M15.5169 19.7065C18.0404 19.7065 20.0861 17.6609 20.0861 15.1374C20.0861 12.6139 18.0404 10.5682 15.5169 10.5682C12.9934 10.5682 10.9478 12.6139 10.9478 15.1374C10.9478 17.6609 12.9934 19.7065 15.5169 19.7065ZM15.5169 12.8528C15.7693 12.8528 15.9739 13.0573 15.9739 13.3097V14.6804H17.3446C17.597 14.6804 17.8015 14.885 17.8015 15.1374C17.8015 15.3897 17.597 15.5943 17.3446 15.5943H15.9739L15.9739 16.965C15.9739 17.2174 15.7693 17.422 15.5169 17.422C15.2646 17.422 15.06 17.2174 15.06 16.965V15.5943H13.6893C13.4369 15.5943 13.2323 15.3897 13.2323 15.1374C13.2323 14.885 13.4369 14.6804 13.6893 14.6804H15.06V13.3097C15.06 13.0573 15.2646 12.8528 15.5169 12.8528Z",
	],
	italic: "M14.0213 3H16.5C17.0523 3 17.5 3.44772 17.5 4C17.5 4.55228 17.0523 5 16.5 5H14.7808L11.2808 19H13C13.5523 19 14 19.4477 14 20C14 20.5523 13.5523 21 13 21H10.0221C10.0079 21.0003 9.99368 21.0003 9.97943 21H7.5C6.94772 21 6.5 20.5523 6.5 20C6.5 19.4477 6.94772 19 7.5 19H9.21921L12.7192 5H11C10.4477 5 10 4.55228 10 4C10 3.44772 10.4477 3 11 3H13.9772C13.9919 2.99968 14.0065 2.99967 14.0213 3Z",
	underline: [
		"M5 21C5 20.4477 5.44772 20 6 20H18C18.5523 20 19 20.4477 19 21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21Z",
		"M6 2C6.55228 2 7 2.44772 7 3V11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11V3C17 2.44772 17.4477 2 18 2C18.5523 2 19 2.44772 19 3V11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11V3C5 2.44772 5.44772 2 6 2Z",
	],
	bold: "M6 6.27273C6 4.46525 7.46525 3 9.27273 3H13C15.7614 3 18 5.23858 18 8C18 9.43071 17.3991 10.7211 16.4359 11.6325C17.9657 12.4875 19 14.123 19 16C19 18.7614 16.7614 21 14 21H9.25C7.45507 21 6 19.5449 6 17.75V6.27273ZM9.27273 5H13C14.6569 5 16 6.34315 16 8C16 9.65685 14.6569 11 13 11H8V6.27273C8 5.56982 8.56982 5 9.27273 5ZM8 13V17.75C8 18.4404 8.55964 19 9.25 19H14C15.6569 19 17 17.6569 17 16C17 14.3431 15.6569 13 14 13H8Z",
	strikethrough:
		"M18.2168 15.6504C18.2168 18.7793 15.7559 20.7363 11.9707 20.7363C8.79492 20.7363 6.5332 19.3066 5.90039 17.2676C5.83008 17.0332 5.7832 16.7754 5.7832 16.5293C5.7832 15.8613 6.1582 15.4395 6.75586 15.4395C7.2832 15.4395 7.61133 15.709 7.77539 16.2715C8.29102 18.0176 9.95508 18.8379 12.0879 18.8379C14.3848 18.8379 16.0488 17.6309 16.0488 15.9668C16.0488 15.1588 15.7444 14.5068 15.0489 14H3C2.44772 14 2 13.5523 2 13C2 12.4477 2.44772 12 3 12H8.74624C6.87707 11.1447 6.04102 9.82468 6.04102 8.00977C6.04102 5.2207 8.50195 3.26367 12.0059 3.26367C14.8301 3.26367 17.1035 4.68164 17.7129 6.9668C17.748 7.0957 17.7715 7.27148 17.7715 7.49414C17.7715 8.06836 17.373 8.44336 16.8105 8.44336C16.2715 8.44336 15.9434 8.16211 15.7559 7.62305C15.1699 5.91211 13.7754 5.16211 11.9473 5.16211C9.83789 5.16211 8.20898 6.19336 8.20898 7.91602C8.20898 9.25195 9.11133 10.166 11.4199 10.6699L13.2949 11.0801C14.3959 11.3215 15.2892 11.6246 15.997 12H21C21.5523 12 22 12.4477 22 13C22 13.5523 21.5523 14 21 14H17.9294C18.1252 14.4894 18.2168 15.0375 18.2168 15.6504Z",
	list: [
		"M7 7C7 6.44772 7.44772 6 8 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H8C7.44772 8 7 7.55228 7 7Z",
		"M7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12Z",
		"M7 17C7 16.4477 7.44772 16 8 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H8C7.44772 18 7 17.5523 7 17Z",
		"M5 7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6C4.55228 6 5 6.44772 5 7Z",
		"M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12Z",
		"M5 17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.4477 5 17Z",
	],
	checklist: [
		"M4.66399 20.7093C6.01303 20.7093 7.10665 19.6157 7.10665 18.2666C7.10665 16.9176 6.01303 15.824 4.66399 15.824C3.31495 15.824 2.22133 16.9176 2.22133 18.2666C2.22133 19.6157 3.31495 20.7093 4.66399 20.7093ZM4.66399 21.9306C6.68756 21.9306 8.32798 20.2902 8.32798 18.2666C8.32798 16.2431 6.68756 14.6026 4.66399 14.6026C2.64042 14.6026 1 16.2431 1 18.2666C1 20.2902 2.64042 21.9306 4.66399 21.9306Z",
		"M4.66399 10.328C6.68756 10.328 8.32798 8.68756 8.32798 6.66399C8.32798 4.64042 6.68756 3 4.66399 3C2.64042 3 1 4.64042 1 6.66399C1 8.68756 2.64042 10.328 4.66399 10.328ZM6.97038 5.65654C7.15207 5.46791 7.15207 5.16209 6.97038 4.97346C6.78868 4.78484 6.49409 4.78484 6.31239 4.97346L3.84977 7.52997L3.01559 6.66399C2.83389 6.47536 2.5393 6.47536 2.3576 6.66399C2.17591 6.85262 2.17591 7.15844 2.3576 7.34707L3.19178 8.21305C3.55518 8.5903 4.14436 8.5903 4.50776 8.21305L6.97038 5.65654Z",
		"M11.3733 6.66399C11.3733 6.32673 11.6467 6.05333 11.9839 6.05333H22.3813C22.7185 6.05333 22.9919 6.32673 22.9919 6.66399C22.9919 7.00125 22.7185 7.27466 22.3813 7.27466H11.9839C11.6467 7.27466 11.3733 7.00125 11.3733 6.66399Z",
		"M11.3813 18.2666C11.3813 17.9294 11.6547 17.656 11.992 17.656H22.3893C22.7266 17.656 23 17.9294 23 18.2666C23 18.6039 22.7266 18.8773 22.3893 18.8773H11.992C11.6547 18.8773 11.3813 18.6039 11.3813 18.2666Z",
	],
	table: "M1 6.25641C1 5.01023 2.01023 4 3.25641 4H20.7436C21.9898 4 23 5.01023 23 6.25641V18.6667C23 19.9128 21.9898 20.9231 20.7436 20.9231H3.25641C2.01023 20.9231 1 19.9128 1 18.6667V6.25641ZM13.1282 5.69231H20.7436C21.0551 5.69231 21.3077 5.94486 21.3077 6.25641V9.07692H13.1282V5.69231ZM13.1282 10.7692H21.3077V14.1538H13.1282V10.7692ZM11.4359 14.1538V10.7692H2.69231V14.1538H11.4359ZM2.69231 15.8462H11.4359V19.2308H3.25641C2.94487 19.2308 2.69231 18.9782 2.69231 18.6667V15.8462ZM13.1282 15.8462H21.3077V18.6667C21.3077 18.9782 21.0551 19.2308 20.7436 19.2308H13.1282V15.8462ZM11.4359 5.69231V9.07692H2.69231V6.25641C2.69231 5.94486 2.94486 5.69231 3.25641 5.69231H11.4359Z",
	"panel-left": [
		"M5.5 8C5.22386 8 5 8.22386 5 8.5C5 8.77614 5.22386 9 5.5 9H7.5C7.77614 9 8 8.77614 8 8.5C8 8.22386 7.77614 8 7.5 8H5.5Z",
		"M5 10.5C5 10.2239 5.22386 10 5.5 10H7.5C7.77614 10 8 10.2239 8 10.5C8 10.7761 7.77614 11 7.5 11H5.5C5.22386 11 5 10.7761 5 10.5Z",
		"M5.5 12C5.22386 12 5 12.2239 5 12.5C5 12.7761 5.22386 13 5.5 13H7.5C7.77614 13 8 12.7761 8 12.5C8 12.2239 7.77614 12 7.5 12H5.5Z",
		"M5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H5C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20ZM19 5.5H10V18.5H19C19.8284 18.5 20.5 17.8284 20.5 17V7C20.5 6.17157 19.8284 5.5 19 5.5ZM5 5.5H9V18.5H5C4.17157 18.5 3.5 17.8284 3.5 17V7C3.5 6.17157 4.17157 5.5 5 5.5Z",
	],
	attachment:
		"M18.8765 7.43719C17.6073 6.16798 15.5495 6.16798 14.2803 7.43719L8.62344 13.094C8.13529 13.5822 8.13529 14.3737 8.62344 14.8618C9.1116 15.35 9.90305 15.35 10.3912 14.8618L16.0481 9.20495C16.341 8.91206 16.8158 8.91206 17.1087 9.20495C17.4016 9.49785 17.4016 9.97272 17.1087 10.2656L11.4519 15.9225C10.3779 16.9964 8.63672 16.9964 7.56278 15.9225C6.48884 14.8485 6.48884 13.1073 7.56278 12.0334L13.2196 6.37653C15.0746 4.52154 18.0822 4.52154 19.9371 6.37653C21.7921 8.23152 21.7921 11.2391 19.9371 13.094L14.2803 18.7509C11.6443 21.3869 7.37039 21.3869 4.73435 18.7509C2.09831 16.1149 2.09831 11.841 4.73435 9.20496L10.3912 3.5481C10.6841 3.25521 11.159 3.25521 11.4519 3.5481C11.7448 3.84099 11.7448 4.31587 11.4519 4.60876L5.79501 10.2656C3.74476 12.3159 3.74476 15.64 5.79501 17.6902C7.84527 19.7405 11.1694 19.7405 13.2196 17.6902L18.8765 12.0334C20.1457 10.7642 20.1457 8.70639 18.8765 7.43719Z",
	folder: "M11 7C10.4696 7 9.96086 6.78929 9.58579 6.41421L8.46447 5.29289C8.27693 5.10536 8.02258 5 7.75736 5H5C4.44772 5 4 5.44772 4 6V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V8C20 7.44772 19.5523 7 19 7H11ZM11 5H19C20.6569 5 22 6.34315 22 8V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V6C2 4.34315 3.34315 3 5 3H7.75736C8.55301 3 9.31607 3.31607 9.87868 3.87868L11 5Z",
	format: [
		"M3.18018 18.4688C3.68994 18.4688 3.97998 18.2227 4.16455 17.6514L5.12256 14.9268H9.97412L10.9409 17.6602C11.1167 18.2227 11.4067 18.4688 11.9341 18.4688C12.5054 18.4688 12.9185 18.0908 12.9185 17.5723C12.9185 17.4053 12.8833 17.2383 12.7954 16.9922L8.92822 6.52441C8.66455 5.82129 8.24268 5.50488 7.55713 5.50488C6.86279 5.50488 6.43213 5.83008 6.17725 6.5332L2.31885 16.9922C2.23096 17.2295 2.1958 17.4229 2.1958 17.5723C2.1958 18.1084 2.59131 18.4688 3.18018 18.4688ZM5.62354 13.3184L7.51318 7.75488H7.56592L9.47314 13.3184H5.62354Z",
		"M17.0229 18.4863C18.2271 18.4863 19.4048 17.8359 19.9409 16.8076H19.9849V17.5898C20.0024 18.1523 20.3628 18.4951 20.8901 18.4951C21.4263 18.4951 21.8042 18.1348 21.8042 17.5371V11.9561C21.8042 10.1016 20.3716 8.91504 18.1304 8.91504C16.4692 8.91504 15.0718 9.58301 14.5884 10.6289C14.4741 10.8398 14.4214 11.0508 14.4214 11.2441C14.4214 11.7188 14.7642 12.0352 15.2388 12.0352C15.5728 12.0352 15.8188 11.9121 16.0122 11.6309C16.5396 10.7871 17.146 10.4619 18.0601 10.4619C19.2202 10.4619 19.9146 11.0771 19.9146 12.1055V12.8174L17.3745 12.9668C15.186 13.0898 13.938 14.083 13.938 15.7002C13.938 17.3613 15.2124 18.4863 17.0229 18.4863ZM17.5415 16.9834C16.5308 16.9834 15.854 16.4561 15.854 15.6475C15.854 14.8564 16.4956 14.3555 17.6294 14.2764L19.9146 14.1357V14.8652C19.9146 16.0693 18.8687 16.9834 17.5415 16.9834Z",
	],
	checkmark:
		"M20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L12.1213 16.2929C10.9497 17.4645 9.05026 17.4645 7.87868 16.2929L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929C4.68342 10.9024 5.31658 10.9024 5.70711 11.2929L9.29289 14.8787C9.68342 15.2692 10.3166 15.2692 10.7071 14.8787L19.2929 6.29289C19.6834 5.90237 20.3166 5.90237 20.7071 6.29289Z",
	settings: [
		"M18.9999 9.00003C19.5522 9.00003 19.9999 9.44775 19.9999 10L19.9999 21C19.9999 21.5523 19.5522 22 18.9999 22C18.4477 22 17.9999 21.5523 17.9999 21L17.9999 10C17.9999 9.44775 18.4477 9.00003 18.9999 9.00003Z",
		"M18.9999 2.00003C19.5522 2.00003 19.9999 2.44775 19.9999 3.00003V6.00003C19.9999 6.55231 19.5522 7.00003 18.9999 7.00003C18.4477 7.00003 17.9999 6.55231 17.9999 6.00003V3.00003C17.9999 2.44775 18.4477 2.00003 18.9999 2.00003Z",
		"M12.9999 3.00003C12.9999 2.44775 12.5522 2.00003 11.9999 2.00003C11.4477 2.00003 10.9999 2.44775 10.9999 3.00003L10.9999 14C10.9999 14.5523 11.4477 15 11.9999 15C12.5522 15 12.9999 14.5523 12.9999 14L12.9999 3.00003Z",
		"M12.9999 18C12.9999 17.4477 12.5522 17 11.9999 17C11.4477 17 10.9999 17.4477 10.9999 18V21C10.9999 21.5523 11.4477 22 11.9999 22C12.5522 22 12.9999 21.5523 12.9999 21V18Z",
		"M5.99994 3.00003C5.99994 2.44775 5.55222 2.00003 4.99994 2.00003C4.44766 2.00003 3.99994 2.44775 3.99994 3.00003L3.99994 10C3.99994 10.5523 4.44766 11 4.99994 11C5.55222 11 5.99994 10.5523 5.99994 10L5.99994 3.00003Z",
		"M5.99994 14C5.99994 13.4477 5.55223 13 4.99994 13C4.44766 13 3.99994 13.4477 3.99994 14L3.99994 21C3.99994 21.5523 4.44765 22 4.99994 22C5.55223 22 5.99994 21.5523 5.99994 21L5.99994 14Z",
		"M18.9999 11C17.3431 11 15.9999 9.65688 15.9999 8.00003C15.9999 6.34318 17.3431 5.00003 18.9999 5.00003C20.6568 5.00003 21.9999 6.34318 21.9999 8.00003C21.9999 9.65689 20.6568 11 18.9999 11ZM18.9999 9.00003C18.4477 9.00003 17.9999 8.55232 17.9999 8.00003C17.9999 7.44775 18.4477 7.00003 18.9999 7.00003C19.5522 7.00003 19.9999 7.44775 19.9999 8.00003C19.9999 8.55232 19.5522 9.00003 18.9999 9.00003Z",
		"M8.99994 16C8.99994 17.6569 10.3431 19 11.9999 19C13.6568 19 14.9999 17.6569 14.9999 16C14.9999 14.3432 13.6568 13 11.9999 13C10.3431 13 8.99994 14.3432 8.99994 16ZM10.9999 16C10.9999 16.5523 11.4477 17 11.9999 17C12.5522 17 12.9999 16.5523 12.9999 16C12.9999 15.4477 12.5522 15 11.9999 15C11.4477 15 10.9999 15.4477 10.9999 16Z",
		"M1.99994 12C1.99994 13.6569 3.34308 15 4.99994 15C6.65679 15 7.99994 13.6569 7.99994 12C7.99994 10.3432 6.65679 9.00003 4.99994 9.00003C3.34308 9.00003 1.99994 10.3432 1.99994 12ZM3.99994 12C3.99994 12.5523 4.44765 13 4.99994 13C5.55222 13 5.99994 12.5523 5.99994 12C5.99994 11.4477 5.55222 11 4.99994 11C4.44765 11 3.99994 11.4477 3.99994 12Z",
	],
	"chevron-right-double": [
		"M11.5429 19.2071C11.1524 18.8166 11.1524 18.1834 11.5429 17.7929L17.3358 12L11.5429 6.20711C11.1524 5.81658 11.1524 5.18342 11.5429 4.79289C11.9334 4.40237 12.5666 4.40237 12.9571 4.79289L18.75 10.5858C19.531 11.3668 19.531 12.6332 18.75 13.4142L12.9571 19.2071C12.5666 19.5976 11.9334 19.5976 11.5429 19.2071Z",
		"M5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L11.0858 12L5.29289 6.20711C4.90237 5.81658 4.90237 5.18342 5.29289 4.79289C5.68342 4.40237 6.31658 4.40237 6.7071 4.79289L12.5 10.5858C13.281 11.3668 13.281 12.6332 12.5 13.4142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071Z",
	],
	profile: [
		"M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z",
		"M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33284 17.7154 5.44116 19.5488C7.19693 21.0756 9.49052 22 12 22C14.4162 22 16.6323 21.143 18.3609 19.7165C18.4276 19.6614 18.4936 19.6055 18.5588 19.5488ZM12.2579 19.9959C12.1723 19.9986 12.0863 20 12 20C11.9914 20 11.9827 20 11.9741 20C11.8937 19.9997 11.8135 19.9983 11.7337 19.9956C10.3914 19.9517 9.13273 19.5772 8.03655 18.9508C8.95181 17.7632 10.3882 17 12 17C13.6118 17 15.0482 17.7632 15.9634 18.9508C14.865 19.5785 13.6033 19.9533 12.2579 19.9959ZM17.5624 17.7498C16.2832 16.0781 14.2675 15 12 15C9.73249 15 7.7168 16.0781 6.43759 17.7498C4.93447 16.2953 4 14.2568 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.2568 19.0655 16.2953 17.5624 17.7498Z",
	],
	lock: "M7 8V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V8C18.6569 8 20 9.34315 20 11V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V11C4 9.34315 5.34315 8 7 8ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V8H9V7ZM6 11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V11Z",
	collaborate: [
		"M11.1237 14.8305C10.8731 14.905 10.7557 15.1787 10.8213 15.4317C10.9509 15.9316 11.0201 16.4574 11.0201 17C11.0201 18.2831 10.6334 19.4721 9.97492 20.4475C9.79625 20.7121 9.86894 21.0844 10.1611 21.2132C11.3102 21.7198 12.5737 22 13.9001 22C19.202 22 23.5001 17.5228 23.5001 12C23.5001 6.47715 19.202 2 13.9001 2C9.08286 2 5.09435 5.69595 4.40533 10.5141C4.3628 10.8115 4.60534 11.0668 4.90556 11.0563L5.36069 11.0404C5.60896 11.0318 5.81168 10.8417 5.85081 10.5964C6.49311 6.56987 9.85243 3.5 13.9001 3.5C18.4067 3.5 22.0601 7.30558 22.0601 12C22.0601 14.3949 21.1092 16.5585 19.5794 18.1034C19.2012 16.1431 17.539 14.6667 15.5458 14.6667H12.2544C11.8622 14.6667 11.4829 14.7238 11.1237 14.8305Z",
		"M13.9001 13.3333C15.4907 13.3333 16.7801 11.9902 16.7801 10.3333C16.7801 8.67648 15.4907 7.33333 13.9001 7.33333C12.3095 7.33333 11.0201 8.67648 11.0201 10.3333C11.0201 11.9902 12.3095 13.3333 13.9001 13.3333Z",
		"M10.0601 17C10.0601 19.7614 7.91105 22 5.26008 22C2.60912 22 0.460083 19.7614 0.460083 17C0.460083 14.2386 2.60912 12 5.26008 12C7.91105 12 10.0601 14.2386 10.0601 17ZM5.74008 15C5.74008 14.7239 5.52518 14.5 5.26008 14.5C4.99499 14.5 4.78008 14.7239 4.78008 15V16.5H3.34008C3.07499 16.5 2.86008 16.7239 2.86008 17C2.86008 17.2761 3.07499 17.5 3.34008 17.5H4.78008V19C4.78008 19.2761 4.99499 19.5 5.26008 19.5C5.52518 19.5 5.74008 19.2761 5.74008 19L5.74008 17.5H7.18008C7.44518 17.5 7.66008 17.2761 7.66008 17C7.66008 16.7239 7.44518 16.5 7.18008 16.5H5.74008V15Z",
	],
	grid: [
		"M8 5H6C5.44772 5 5 5.44772 5 6V8C5 8.55228 5.44772 9 6 9H8C8.55228 9 9 8.55228 9 8V6C9 5.44772 8.55228 5 8 5ZM6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6Z",
		"M8 15H6C5.44772 15 5 15.4477 5 16V18C5 18.5523 5.44772 19 6 19H8C8.55228 19 9 18.5523 9 18V16C9 15.4477 8.55228 15 8 15ZM6 13C4.34315 13 3 14.3431 3 16V18C3 19.6569 4.34315 21 6 21H8C9.65685 21 11 19.6569 11 18V16C11 14.3431 9.65685 13 8 13H6Z",
		"M18 5H16C15.4477 5 15 5.44772 15 6V8C15 8.55228 15.4477 9 16 9H18C18.5523 9 19 8.55228 19 8V6C19 5.44772 18.5523 5 18 5ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16Z",
		"M18 15H16C15.4477 15 15 15.4477 15 16V18C15 18.5523 15.4477 19 16 19H18C18.5523 19 19 18.5523 19 18V16C19 15.4477 18.5523 15 18 15ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z",
	],
	"lock-filled":
		"M7 8V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V8C18.6569 8 20 9.34315 20 11V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V11C4 9.34315 5.34315 8 7 8ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V8H9V7Z",
	share: [
		"M8.99858 10.0399C9.02798 10.5914 8.60474 11.0623 8.05324 11.0917C7.30055 11.1318 6.7044 11.1809 6.23854 11.23C5.61292 11.296 5.23278 11.6803 5.16959 12.2331C5.07886 13.0267 5 14.2278 5 16C5 17.7723 5.07886 18.9733 5.16959 19.7669C5.23289 20.3207 5.61207 20.7039 6.23675 20.7698C7.33078 20.8853 9.13925 21 12 21C14.8608 21 16.6692 20.8853 17.7632 20.7698C18.3879 20.7039 18.7671 20.3207 18.8304 19.7669C18.9211 18.9733 19 17.7723 19 16C19 14.2278 18.9211 13.0267 18.8304 12.2331C18.7672 11.6803 18.3871 11.296 17.7615 11.23C17.2956 11.1809 16.6995 11.1318 15.9468 11.0917C15.3953 11.0623 14.972 10.5914 15.0014 10.0399C15.0308 9.48837 15.5017 9.06512 16.0532 9.09452C16.8361 9.13626 17.4669 9.18787 17.9712 9.24106C19.4556 9.39761 20.6397 10.4507 20.8175 12.0059C20.9188 12.8923 21 14.1715 21 16C21 17.8285 20.9188 19.1077 20.8175 19.9941C20.6398 21.5484 19.4585 22.602 17.9732 22.7588C16.7919 22.8834 14.9108 23 12 23C9.08922 23 7.20806 22.8834 6.02684 22.7588C4.54151 22.602 3.36021 21.5484 3.18253 19.9941C3.0812 19.1077 3 17.8285 3 16C3 14.1715 3.0812 12.8923 3.18253 12.0059C3.36031 10.4507 4.54436 9.39761 6.02877 9.24106C6.53306 9.18787 7.16393 9.13626 7.94676 9.09452C8.49827 9.06512 8.96918 9.48837 8.99858 10.0399Z",
		"M9.20711 6.20711C8.81658 6.59763 8.18342 6.59763 7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289L11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711C15.8166 6.59763 15.1834 6.59763 14.7929 6.20711L13 4.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V4.41421L9.20711 6.20711Z",
	],
	note: [
		"M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V12C19 11.4477 19.4477 11 20 11C20.5523 11 21 11.4477 21 12V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H12C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4H6Z",
		"M8.06412 11.6638C7.91113 11.8168 7.81188 12.0153 7.78128 12.2295L7.30988 15.5293C7.2156 16.1893 7.78128 16.755 8.44125 16.6607L11.7411 16.1893C11.9553 16.1587 12.1538 16.0594 12.3068 15.9064L19.8492 8.36397C21.0208 7.19239 21.0208 5.2929 19.8492 4.12132C18.6777 2.94975 16.7782 2.94975 15.6066 4.12132L8.06412 11.6638ZM16.3137 9.07108L11.1283 14.2565L9.47834 14.4922L9.71404 12.8423L14.8995 7.65686L16.3137 9.07108ZM17.7279 7.65686L16.3137 6.24265L17.0208 5.53554C17.4113 5.14501 18.0445 5.14501 18.435 5.53554C18.8255 5.92606 18.8255 6.55923 18.435 6.94975L17.7279 7.65686Z",
	],
	photos: [
		"M16.5 9C17.3284 9 18 8.32843 18 7.5C18 6.67157 17.3284 6 16.5 6C15.6716 6 15 6.67157 15 7.5C15 8.32843 15.6716 9 16.5 9Z",
		"M6 5C6 3.34315 7.34315 2 9 2H19C20.6569 2 22 3.34315 22 5V15C22 16.6569 20.6569 18 19 18H18V19C18 20.6569 16.6569 22 15 22H5C3.34315 22 2 20.6569 2 19V9C2 7.34315 3.34315 6 5 6H6V5ZM9 18H16V19C16 19.5523 15.5523 20 15 20H5C4.44772 20 4 19.5523 4 19V9C4 8.44772 4.44772 8 5 8H6V15C6 16.6569 7.34315 18 9 18ZM9 4H19C19.5523 4 20 4.44772 20 5V15C20 15.2279 19.9238 15.438 19.7954 15.6061C19.7648 15.5654 19.7316 15.5254 19.6959 15.4864L13.319 8.52987C12.0918 7.19102 9.96566 7.24121 8.80293 8.63649L8 9.6V5C8 4.44772 8.44772 4 9 4ZM8 12.7241V15C8 15.5523 8.44772 16 9 16H17.4535L11.8447 9.88132C11.4356 9.43503 10.7269 9.45177 10.3394 9.91686L8 12.7241Z",
	],
	trash: "M10 2C8.34315 2 7 3.34315 7 5H4H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H20H17C17 3.34315 15.6569 2 14 2H10ZM15 5C15 4.44772 14.5523 4 14 4H10C9.44772 4 9 4.44772 9 5H15ZM7 7H6V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7H17H7Z",
	"chevron-down":
		"M4.79289 8.54289C5.18342 8.15237 5.81658 8.15237 6.20711 8.54289L12 14.3358L17.7929 8.54289C18.1834 8.15237 18.8166 8.15237 19.2071 8.54289C19.5976 8.93341 19.5976 9.56658 19.2071 9.9571L13.4142 15.75C12.6332 16.531 11.3668 16.531 10.5858 15.75L4.79289 9.95711C4.40237 9.56658 4.40237 8.93342 4.79289 8.54289Z",
};

export default icons;
