param (
    [string]$env = "prod"
)

$front_image = "exam_front:1.0"
$back_image = "exam_back:1.0"

if ($env -eq "dev"){
    $front_image+="-dev"
    $back_image+="-dev"
}

docker build ./dev/back -f ./dev/back/Dockerfile.dev -t backtrack5r3/$back_image
docker build ./dev/front -f ./dev/front/Dockerfile.dev -t backtrack5r3/$front_image

docker push backtrack5r3/$back_image
docker push backtrack5r3/$front_image