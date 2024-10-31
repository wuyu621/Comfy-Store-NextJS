import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";
import { fetchProductReviews } from "@/utils/actions";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.length === 0 && (
          <h2 className="capitalize">there is no review of this product yet</h2>
        )}
        {reviews.map((review) => {
          const { id, authorName, authorImageUrl, rating, comment } = review;

          const reviewInfo = {
            reviewId: id,
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };

          return (
            <ReviewCard key={reviewInfo.reviewId} reviewInfo={reviewInfo} />
          );
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
