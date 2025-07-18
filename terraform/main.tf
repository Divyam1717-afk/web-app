provider "aws" {
  region = "ap-south-1"  
}

resource "aws_instance" "example" {
  ami           = "ami-0e001c9271cf7f3b9" # Amazon Linux 2 (Mumbai region)
  instance_type = "t2.micro"

  tags = {
    Name = "devsecops-example-instance"
  }
}