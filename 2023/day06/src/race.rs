pub mod race {

    #[derive(Debug, Clone)]
    pub struct Race {
        pub time: isize,
        pub record_distance: isize,
    }

    impl Race {
        pub fn get_count(&self) -> usize {
            let a: f64 = -1.0;
            let b: f64 = self.time.clone() as f64;
            let c: f64 = -1.0 * self.record_distance.clone() as f64;

            let discriminant: f64 = b * b - 4.0 * a * c;
            if discriminant <= 0.0 {
                return 0;
            }

            println!("{discriminant}");

            let first_zero = ((-1.0 * b + discriminant.sqrt()) / (2.0 * a)).floor();
            let second_zero = ((-1.0 * b - discriminant.sqrt()) / (2.0 * a)).ceil();

            (second_zero - first_zero - 1.0) as usize
        }
    }
}
