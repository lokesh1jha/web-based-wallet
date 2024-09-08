
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
      <Card>
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    )
  }
  
  interface ProductCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
    isReversed: boolean;
  }
  
  export const ProductCard = ({ icon, title, description, features, ctaText, ctaLink, imageUrl, isReversed }: ProductCardProps) =>  {
    return (
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
        <div className="w-full md:w-1/2">
          <Image src={imageUrl} alt={title} width={400} height={300} className="rounded-lg shadow-xl" />
        </div>
        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <div className="mb-4">{icon}</div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button asChild>
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  export const RoadmapCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
      <Card>
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    )
  }