import { Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { get } from '../../../utils/fetchApi';

const SocialLogos = () => {

    const { data: socialData = [], isLoading } = useQuery({
		queryKey: ["socialData"],
		queryFn: async () => {
			const res = await get("social/all");
			const data = res.data.payload.data;

			return data;
		},
	});

    if(isLoading){
        return (<div className="flex justify-center items-center h-20">
        <Spinner className="text-color-secondary" />
    </div>)
    }
  return (
    <div className="p-5 flex  flex-wrap gap-5 justify-center items-center md:justify-evenly ">
    {socialData &&
        socialData.map(({ logo,  socialLink, isPublished }) =>
            isPublished ? (
                <a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer">
                    <div className="flex gap-3 shadow-xl rounded-xl  justify-center ">
                        <div className="flex justify-center items-center">
                            <LazyLoadImage
                                effect="blur"
                                src={logo}
                                alt="card-image"
                                className="object-fill "
                                width="40"
                                height="40"
                            />
                        </div>
                        {/* <div>
                            <p className="font-bold text-color-secondary">
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </p>
                            <p  className="font-medium ">
                                {description}
                            </p>
                        </div> */}
                    </div>
                </a>
            ) : null
        )}
</div>
  )
}

export default SocialLogos