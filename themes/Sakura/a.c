#include<stdio.h>
#define f(a,b) a##b
#define g(a) #a
#define h(a) g(a)

int main(int argc, char const *argv[])
{
	printf("%s %s\n",h(f(1,2)),g(f(1,2)) );
	return 0;
}