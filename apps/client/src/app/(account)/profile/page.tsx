import ProfileForm from "@/components/profile/ProfileForm";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="mt-2 text-gray-500">Manage your personal information.</p>
      </div>

      <ProfileCard />
      <ProfileStats />
      <ProfileForm />
    </div>
  );
}
